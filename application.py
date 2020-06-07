# dependencies
from BellyButtonData import BellyButtonData
from flask import Flask, jsonify, render_template

#################################################
# Database Setup
#################################################
data = BellyButtonData("sqlite:///Data/UCS_Satellite.sqlite.db")

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    users = data.get_subject_ids()
    return render_template("index.html", user_ids=users)

@app.route("/api/v1.0")
def show_apis():
    """List all available api routes."""
    return (
        f"<h4>Available Routes:</h4>"
        f'<a href="/api/v1.0/ids">/api/v1.0/ids</a><br/>'       
        f'<a href="/api/v1.0/info/1286">/api/v1.0/info/subject_id</a><br/>' 
        f'<a href="/api/v1.0/subjects">/api/v1.0/subjects</a><br/>' 
        f'<a href="/api/v1.0/subjects/1286">/api/v1.0/subjects/subject_id</a><br/>' 
        f'<a href="/api/v1.0/otu">/api/v1.0/otu</a><br/>' 
        f'<a href="/"><h4>Back</h4></a><br/>' 
    )    

@app.route("/api/v1.0/ids")
def get_all_ids():
    return jsonify(data.get_subject_ids())

@app.route("/api/v1.0/otu")
def get_all_otu():
    return jsonify(data.get_otu_ref())

@app.route("/api/v1.0/info")
def get_all_user_results():
    return jsonify(data.get_data_by_user())    

@app.route("/api/v1.0/info/<subject_id>")
def get_one_user_results(subject_id):
    return jsonify(data.get_data_by_user(subject_id))    

@app.route("/api/v1.0/subjects")
def get_all_subjects():
    return jsonify(data.get_subjects())

@app.route("/api/v1.0/subjects/<subject_id>")
def get_one_subject(subject_id):
    return jsonify(data.get_subjects(subject_id))



if __name__ == '__main__':
    app.run(debug=True)