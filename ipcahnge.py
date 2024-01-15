

import os

def is_binary(file_path):
    try:
        with open(file_path, 'tr') as check_file:  
            check_file.read()
            return False
    except:  
        return True

def replace_ip_in_file(file_path, old_ip, new_ip):
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as file:
            filedata = file.read()

        filedata = filedata.replace(old_ip, new_ip)

        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(filedata)
    except UnicodeDecodeError:
        print(f"error : {file_path}")

def replace_ip_in_folder(folder_path, old_ip, new_ip):
    for subdir, dirs, files in os.walk(folder_path):
        for file in files:
            file_path = os.path.join(subdir, file)
            if not is_binary(file_path):
                replace_ip_in_file(file_path, old_ip, new_ip)

folder_path = '/'  # your path
old_ip = 'localip'           # local ip
new_ip = 'serverip'          # your server ip
# python ipchange.py
replace_ip_in_folder(folder_path, old_ip, new_ip)
