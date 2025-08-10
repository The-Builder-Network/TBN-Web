import tiktoken
enc = tiktoken.get_encoding("gpt-5-nano")
tokens = enc.encode(prompt)
print(len(tokens))
