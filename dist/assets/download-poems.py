import json
import os
import requests
import time

def get_poem_text(poem):
    """Combine title, author and paragraphs into full text, matching frontend logic"""
    if not poem:
        return ''
    
    paragraphs_text = '。'.join(poem['paragraphs']) if poem.get('paragraphs') else ''
    return f"{poem['title']} {poem['author']} {paragraphs_text}"

def download_audio(text, output_file):
    """Download audio using the TTS web service"""
    # Construct URL with parameters
    params = {
        'text': text,
        'voice': 'zh-CN-XiaoxiaoNeural'
    }
    
    url = f"https://azure-tts-worker.xiaopei0206.workers.dev/"
    
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()  # Raise an error for bad status codes
        
        # Save the audio content
        with open(output_file, 'wb') as f:
            f.write(response.content)
        print(f"Audio saved to: {output_file}")
        
    except requests.exceptions.RequestException as e:
        print(f"Error downloading audio: {e}")

def main():
    # Create output directory if it doesn't exist
    output_dir = "poem_audio"
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    # Load poems from JSON file
    with open('poems.json', 'r', encoding='utf-8') as f:
        poems = json.load(f)
    
    # Process each poem
    for poem in poems:
        # Create safe filename
        safe_title = poem['title'].replace('/', '_').replace('\\', '_')
        output_file = os.path.join(output_dir, f"{safe_title}.mp3")
        
        # Skip if file already exists
        if os.path.exists(output_file):
            print(f"Skipping {safe_title} - file already exists")
            continue
        
        # Get full text and download audio
        full_text = get_poem_text(poem)
        print(f"Processing: {poem['title']}")
        download_audio(full_text, output_file)
        
        # Add delay between requests
        time.sleep(1)

if __name__ == "__main__":
    main()