# Pandadoc Field Tags PDF example

![Field Tags 1](image-1.png)

![Field Tags 2](image.png)

1. Set your company emails at _mock-data/_
2. Use **roles** to define who needs to sign which field tag
3. Use **optIds** to set variables in your document

```js
// textfield:user:name___ relates to:
"fields": {
    "name": {
        "value": "Jane",
        "role": "user"
    }
}
```

## Consult Pandadoc guides for further info

[Create a Document from File upload or URL](https://developers.pandadoc.com/docs/create-document-from-file)
