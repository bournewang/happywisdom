#!/bin/bash
# add_image.sh

# Check if file is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <json_file>"
    exit 1
fi

JSON_FILE="$1"
BACKUP_FILE="${JSON_FILE}.backup"
TEMP_FILE="${JSON_FILE}.temp"

# Create backup
cp "$JSON_FILE" "$BACKUP_FILE"

# Process the file
while IFS= read -r line; do
    if [[ $line =~ \"videoUrl\":\ *\"([^\"]+)\" ]]; then
        # Get the video URL
        video_url="${BASH_REMATCH[1]}"
        # Create image URL by replacing .mp4 with .jpg
        image_url="${video_url/.mp4/.mp3}"
        # Replace the line with both video and image
        new_line="${line%\},*}, \"audioUrl\": \"$image_url\"},"
        echo "$new_line"
    else
        echo "$line"
    fi
done < "$JSON_FILE" > "$TEMP_FILE"

# Replace original file with new content
# mv "$TEMP_FILE" "$JSON_FILE"

echo "Updated $JSON_FILE with image fields"
echo "Backup saved as $BACKUP_FILE"