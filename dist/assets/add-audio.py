import json

def update_poems_json():
    # Read the existing JSON file
    with open('poems.json', 'r', encoding='utf-8') as f:
        poems = json.load(f)
    
    # Add audioUrl to each poem
    for poem in poems:
        poem['audioUrl'] = f"{poem['title']}.mp3"
    
    # Write back to the file with proper indentation
    with open('poems.json', 'w', encoding='utf-8') as f:
        json.dump(poems, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    update_poems_json()