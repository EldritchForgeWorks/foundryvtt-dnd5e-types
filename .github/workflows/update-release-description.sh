#!/bin/bash

# Get the DnD5e version from version.json
DND5E_VERSION=$(node -p "require('./version.json').dnd5eVersion")
RELEASE_ID=$1
TAG_NAME=$2
REPO=$3

# Get the current release body
RELEASE_BODY=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
  "https://api.github.com/repos/$REPO/releases/$RELEASE_ID" | \
  jq -r '.body')

# Create the new release body
NEW_BODY="## Compatible with DnD5e version ${DND5E_VERSION}

${RELEASE_BODY}

## Installation

\`\`\`bash
npm install --save-dev foundryvtt-dnd5e-types@${TAG_NAME}
\`\`\`

Or with a specific DnD5e version tag:

\`\`\`bash
npm install --save-dev foundryvtt-dnd5e-types@dnd5e-v${DND5E_VERSION}
\`\`\`

## Documentation

For full documentation, visit the [GitHub repository](https://github.com/$REPO)"

# Escape the JSON for curl
ESCAPED_BODY=$(echo "$NEW_BODY" | jq -Rs .)

# Update the release body
curl -X PATCH \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  "https://api.github.com/repos/$REPO/releases/$RELEASE_ID" \
  -d "{\"body\":$ESCAPED_BODY}"
