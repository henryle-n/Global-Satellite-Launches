from flask import Flask, jsonify, render_template
import csv
import pandas as pd
import numpy as np

app = Flask(__name__)

#titanic_df = pd.read_csv("static/data/train.csv")
#survived = titanic_df[(titanic_df['Survived']==1) & (titanic_df["Age"].notnull())]

@app.route('/')
def index():
    maindf = pd.read_excel('UCS-Satellite-Database-4-1-2020-General-CLEAN-DATA.xlsx')
    country_names_counts = maindf.groupby('Country_of_Operator_Owner')['Satellite_Names'].count().reset_index().rename(
        columns={'Satellite_Names': 'Satellite_Counts'})
    country_names_counts.to_csv('country_names_counts.csv', index=False)
    country_names_counts['Country_of_Operator_Owner'] = country_names_counts['Country_of_Operator_Owner'].str.replace(
        'USA', 'United States of America')
    country_names_counts['Country_of_Operator_Owner'] = country_names_counts['Country_of_Operator_Owner'].str.replace('ESA', 'European Space Agency')
    country_names_counts.to_csv('static/assets/data/New_country_names_counts.csv')
    country_names_counts.to_json('static/assets/data/New_country_names_counts.json')
	
	
    ###############################################
    leaflet = pd.read_excel('UCS-Satellite-Database-4-1-2020-General-CLEAN-DATA.xlsx')[[
        'Country_of_Operator_Owner', 'Satellite_Names', 'Launch_Date']]

    leaflet['Launch_Date'] = pd.to_datetime(leaflet['Launch_Date'])
    leaflet['Launch_Date_year'] = leaflet['Launch_Date'].dt.year

    leaflet_groupby = leaflet.groupby(['Country_of_Operator_Owner', 'Launch_Date_year'])[
        'Satellite_Names'].count().reset_index().rename(columns={'Satellite_Names': 'Satellite_Counts'})
    leaflet_groupby['Country_of_Operator_Owner'] = leaflet_groupby['Country_of_Operator_Owner'].str.replace('USA',
                                                                                                              'United States of America')
    leaflet_groupby['Country_of_Operator_Owner'] = leaflet_groupby['Country_of_Operator_Owner'].str.replace('ESA',
                                                                                                              'European Space Agency')

    leaflet_groupby.to_csv('static/assets/data/choropleth_graphs_countries_count_per_year.csv')
    leaflet_groupby.to_json('static/assets/data/choropleth_graphs_countries_count_per_year.json')

	###############################################

    return render_template('index.html')



@app.route('/get_country_names_counts')
def get_country_names_counts():
    country_names_counts=pd.read_csv("static/assets/data/New_country_names_counts.csv")
    
    #country_names_counts.to_json('static/assets/data/New_country_names_counts.json')
    return jsonify(country_names_counts)

@app.route('/choropleth_graphs_countries_count_per_year')
def choropleth_graphs_countries_count_per_year():
    leaflet_groupby=pd.read_csv('static/assets/data/choropleth_graphs_countries_count_per_year.csv')

    return jsonify(leaflet_groupby)


if __name__ == '__main__':
      app.run(debug=True)