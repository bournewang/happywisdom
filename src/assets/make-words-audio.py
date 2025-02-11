import json
import requests
import time
import argparse

def fetch_audio_and_phonetic(word):
    if ' ' in word:
        # Skip expressions with spaces
        print(f"Skipping expression: {word}")
        return None, None

    try:
        response = requests.get(f'https://api.dictionaryapi.dev/api/v2/entries/en/{word}')
        if response.status_code == 200:
            data = response.json()
            # Extract the first available phonetic with both text and audio
            phonetics = data[0].get('phonetics', [])
            for phonetic in phonetics:
                if 'audio' in phonetic and phonetic['audio'] and 'text' in phonetic and phonetic['text']:
                    return phonetic['audio'], phonetic['text']
        else:
            print(f"Error fetching definition for {word}: {response.status_code}")
    except Exception as e:
        print(f"Exception occurred for {word}: {e}")
    return None, None

def process_vocabulary_file(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        vocabulary = json.load(f)

    updated_vocabulary = []
    total_words = len(vocabulary)
    progress_checkpoints = {int(total_words * i / 10) for i in range(1, 11)}

    for index, entry in enumerate(vocabulary):
        word = entry['word']
        definition = entry['definition']
        audio_url, phonetic_text = fetch_audio_and_phonetic(word)
        
        updated_entry = {
            "word": word,
            "definition": definition,
            "phonetic": phonetic_text or ""
        }
        
        # Only add audioUrl if it is not None
        if audio_url:
            updated_entry["audioUrl"] = audio_url
        else:
            updated_entry["audioUrl"] = ""

        updated_vocabulary.append(updated_entry)

        # Output progress at every 10%
        if index + 1 in progress_checkpoints:
            progress_percentage = ((index + 1) / total_words) * 100
            print(f"Progress: {int(progress_percentage)}%")

        # Sleep to avoid hitting API rate limits
        time.sleep(1)

    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(updated_vocabulary, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Process vocabulary file to add audio URLs and phonetics.')
    parser.add_argument('input_file', type=str, help='Path to the input JSON file')
    parser.add_argument('output_file', type=str, help='Path to the output JSON file')
    args = parser.parse_args()

    process_vocabulary_file(args.input_file, args.output_file)