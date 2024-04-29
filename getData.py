import openai
import json
import time
import os

openai.api_key =key'


with open(r'C:\Users\AmirS\Downloads\ixtisaslar.json', 'r') as file:
        ixtisaslar_dict = json.load(file)

def send_json_to_gpt(file_path):
    with open(file_path, 'r') as file:
        input_data = json.load(file)
        group_id = str(input_data['answers']['groupId'])

    gpt_prompt = f'''mənim bir startupum var, 
    şagirdin verdiyi cavablara əsasən onun hansı ixtisasa uyğun olduğunu müəyyən etmək istəyirəm. 
    Şagirdə verdiyim suallar və onun verdiyi cavablar {input_data['answers']['answers']} bunlardır. 
    Şagirdin cavablarına əsasən, aşağıdakı ixtisaslardan hansına daha uyğun olduğunu faizlə və izahlı şəkildə yaz. 
    Ümumi top 5 ixtisas yaz: {ixtisaslar_dict[group_id]}.
    Üçüncü şəxslə danışırmış kimi yox, şagirdlə danışırmış kimi cavabla'''

    message=[{"role": "user", "content": gpt_prompt}]
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages = message,
        temperature=0.2,
        max_tokens=5012,
        frequency_penalty=0.0
    )
    result = response['choices'][0]['message']['content']

    return result


def read_json_file(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
        return data

def clear_json_file(file_path):
    with open(file_path, 'w') as file:
        json.dump({}, file)


while True:
    json_file_path = r'C:\Users\AmirS\Desktop\Новая папка\db.json'
    
    previous_content = None
    current_content = read_json_file(json_file_path)

    if current_content != previous_content:
        time.sleep(10)

        try:
            with open(json_file_path, 'r'):
                pass
        except FileNotFoundError:
            time.sleep(10)
            continue

        response = send_json_to_gpt(json_file_path)
        recom_dict = {"Recomendations": response}

        file_path = 'recomendations.json'
        with open(file_path, 'w') as json_file:
            json.dump(recom_dict, json_file)
        clear_json_file(json_file_path)
