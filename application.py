# dependencies
from  SatelliteClass import SatLauch 
from flask import Flask, jsonify, render_template

#################################################
# Database Setup
#################################################
data = SatLauch("sqlite:///Data/UCS_Satellite.sqlite")

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def homePage():
    ''' Home Page Access Route'''
    return render_template("index.html")

@app.route("/api")
def get_all_APIs():
    """List all available API routes."""
    return render_template("api.html")

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