# dependencies
from BellyButtonData import BellyButtonDatas
from flask import Flask, jsonify, render_template

#################################################
# Database Setup
#################################################
data = BellyButtonDatas("sqlite:///Data/belly_button.db")

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
    return render_template("api_list.html")    

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