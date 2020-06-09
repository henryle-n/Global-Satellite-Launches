# dependencies
from  SatelliteClass import SatLaunch 
from flask import Flask, jsonify, render_template

#################################################
# Database Setup
#################################################
data = SatLaunch("sqlite:///Data/UCS_Satellite.db")

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

# main home page route - this will be static
# big jumpotron and learn more
@app.route("/")
def home_page():
    ''' Home Page Access Route'''
    return render_template("index.html")

@app.route("/data-filterable")
def main_page():
    ''' Data Table with filters '''
    return render_template("data-filterable.html")

@app.route("/visualization")
def data_viz():
    ''' Run data visualization '''
    return render_template("visualization.html")

# route to static HTML of APIs route
@app.route("/api")
def api_list():
    """List all available API routes"""
    return render_template("api.html")

# route to static HTML Team personal/ professional info
@app.route("/about")
def about_us():
    """Team rooster and info"""
    return render_template("about.html")

# route to static HTML Team contact info
@app.route("/contact")
def contact_us():
    '''Team contact info'''
    return render_template("contact.html")

# route to satellite name records of 46 years
@app.route("/api/satellite-directory")
def get_all_satellite_names():
    return jsonify(data.get_satellite_names())

# route to launch date records of 46 years
@app.route("/api/launch-date")
def get_all_launch_date():
    return jsonify(data.get_launch_date())

# route to metadata - table data description
@app.route("/api/metadata")
def get_metadata():
    return jsonify(data.meta_info())   

# route to demographic data 
@app.route("/api/satellite-bio")
def get_all_demoG_data():
    return jsonify(data.get_satbio_data())

# filterable by satellite name
@app.route("/api/satellite-bio/<satellite_name>")
def get_selected_demoG_data(satellite_name):
    return jsonify(data.get_satbio_data(satellite_name))

# route to 46 years satellite launch by country, and counts
@app.route("/api/lauch-history-by-country")
def get_all_country_counts():
    return jsonify(data.get_40yr_sat_lauch_by_country())

# route to 46 years satellite launch by chosen country, and counts
@app.route("/api/lauch-history-by-country/<country_name>")
def get_selected_country_counts(country_name):
    return jsonify(data.get_40yr_sat_lauch_by_country(country_name))

# master data of 1974-2020 Satellite Info DB
@app.route("/api/master-record")
def get_master_recs():
    return jsonify(data.get_40yr_master_record())


@app.route("/choropleth")
def get_choropleth():
    return render_template("choropleth.html")

# exe program
if __name__ == '__main__':
    app.run(debug=True)