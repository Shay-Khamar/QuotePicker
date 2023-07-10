from flask import Flask, render_template, make_response,jsonify, request
import sys, json, os
app = Flask('app')

@app.route('/')
def hello_world():
  return render_template("index.html")


@app.route("/api/getQuote", methods=['GET'])
def getQuote():
  root_path = os.path.realpath(os.path.dirname(__file__))
  file_path = os.path.join(root_path,"DATA", "quoteFile.json")
  with open (file_path, 'r') as file:
    file_content = json.load(file)


    response = make_response(
      file_content,
      200
    )

    return response

  return "Error Reading File", 500

  
@app.route("/api/addQuote", methods=['PUT'])
def addQuote():
  json_data = request.json
  root_path = os.path.realpath(os.path.dirname(__file__))
  file_path = os.path.join(root_path,"DATA", "quoteFile.json")
  with open (file_path, 'w') as file:
     json.dump(json_data, file)

  
  return make_response("complete", 200)
  
  return "Error Reading File", 500
  
app.run(host='0.0.0.0', port=8080)