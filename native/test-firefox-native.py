#! /usr/bin/env python

# symlink this file into your home dir
# ln -sv $(realpath ./native/test-firefox-native.py) /tmp/
# and the json file into your user's native-messaging-hosts dir:
# ln -sv $(realpath ./native/test_firefox_native.json) ~/.mozilla/native-messaging-hosts/test_firefox_native.json

# based on https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_messaging#App_side and https://github.com/mdn/webextensions-examples/blob/master/native-messaging/app/ping_pong.py

import json
import sys
import struct
import datetime


def get_message():
    raw_length = sys.stdin.buffer.read(4)
    if not raw_length:
        sys.exit(0)
    message_length = struct.unpack('@I', raw_length)[0]
    message = sys.stdin.buffer.read(message_length).decode('utf-8')
    return json.loads(message)


def encode_message(message_content):
    encoded_content = json.dumps(message_content).encode('utf-8')
    encoded_length = struct.pack('@I', len(encoded_content))
    return {'length': encoded_length, 'content': encoded_content}


def send_message(encoded_message):
    sys.stdout.buffer.write(encoded_message['length'])
    sys.stdout.buffer.write(encoded_message['content'])
    sys.stdout.buffer.flush()


while True:
    message = get_message()
    now = datetime.datetime.now().timestamp() * 1000
    time_to_receive = now - message['d']
    reply = {
        'got': message['r'],
        'sent': message['d'],
        'at': now,
        'rcvd': time_to_receive,
    }
    send_message(encode_message(reply))
