# dependencies
import pandas as pd
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect, join, outerjoin, MetaData, Table

class SatLaunch():

    def __init__(self, connect_string):
        self.engine = create_engine(connect_string)
        # self.conn = self.engine.connect()
        self.connect_string = connect_string
        self.inspector = inspect(self.engine)
        self.tables = self.inspector.get_table_names()
        self.Base = automap_base()
        self.Base.prepare(self.engine, reflect=True)
        self.meta = MetaData()
        self.MasterRecord = self.Base.classes['Satellite_Launch_MasterCL']
        self.DemoGData = self.Base.classes['Demographic_Data']
        self.LaunchDate = self.Base.classes['Launch_Date']
        self.SatCount40yr = self.Base.classes['Launch_by_Country_46yr']
        self.Top10LaunchDates = self.Base.classes['Top10_Launch_Dates']
        self.ChoroPlethMap = self.Base.classes['ChoroplethMapData-Henry-Updates']
        
        
    def display_db_info(self):
        inspector = inspect(self.engine)
        tables = self.inspector.get_table_names()
        for table in tables:
            print("\n")
            print('=' * 12)
            print(f"Table '{table}' has the following columns: ")
            print('-' * 12)
            for column in inspector.get_columns(table):
                print(f"name: {column['name']}   column type: {column['type']}")


    def meta_info(self):
        inspector = inspect(self.engine)
        tables = self.inspector.get_table_names()
        metadata_list=[]
      
        for table in tables:
            ea_metadata = {
                "Table_Name" : table
            }
            
            new_dict=new_dict={
            "column_name" : [],
            "column_type" : []
            }
            for column in inspector.get_columns(table):
                new_dict["column_name"].append(column['name'])
                new_dict["column_type"].append(f"{column['type']}")
            ea_metadata.update(new_dict)
            metadata_list.append(ea_metadata)
        return metadata_list
        
    # return all satellite names
    def get_satellite_names(self):
        session = Session(self.engine)

        results = session.query(self.DemoGData.Satellite_Names)
            
        df = pd.read_sql(results.statement, session.connection())

        session.close()  
        return list(df.Satellite_Names)
    
    # get all demo data based on chosen satellite name
    def get_satbio_data(self, sat_name=""):
        session = Session(self.engine)

        if sat_name == "":
            results = session.query(self.DemoGData)
        else:
            results = session.query(self.DemoGData).filter(self.DemoGData.Satellite_Names == sat_name)    
            
        df = pd.read_sql(results.statement, session.connection())

        session.close()  
        return df.to_dict(orient="records")
    
    # get the lauch date table
    def get_launch_date(self):
        session = Session(self.engine)

        results = session.query(self.LaunchDate)
            
        df = pd.read_sql(results.statement, session.connection())

        session.close()  
        return df.to_dict(orient="records")
    
    # 40 years of satellite launch counts by country 
    def get_40yr_sat_lauch_by_country(self, country_name=""):
        session = Session(self.engine)

        if country_name=="":
            results = session.query(self.SatCount40yr)
        else:
            results = session.query(self.SatCount40yr).filter(self.SatCount40yr.Country_of_Operator_Owner == country_name)

        df = pd.read_sql(results.statement, session.connection())

        session.close()  
        return df.to_dict(orient="records")
                      
    #  40 years of satellite launch - master records 
    def get_40yr_master_record(self):
        session = Session(self.engine)

        results = session.query(self.MasterRecord)
            
        df = pd.read_sql(results.statement, session.connection())

        session.close()  
        return df.to_dict(orient="records")

    # top 10 launch year, month, and day counts
    def get_top10_launch_dates(self):
        session = Session(self.engine)

        results = session.query(self.Top10LaunchDates)
            
        df = pd.read_sql(results.statement, session.connection())

        session.close()  
        return df.to_dict(orient="records")


    def get_countryCount_perYear_perCountry(self, country_name=""):
        session = Session(self.engine)

        if country_name=="":
            results = session.query(self.ChoroPlethMap)
        else:
            results = session.query(self.ChoroPlethMap).filter(self.ChoroPlethMap.Country_of_Operator_Owner == country_name)

        df = pd.read_sql(results.statement, session.connection())

        session.close()  
        return df.to_dict(orient="records")



                      
if __name__ == '__main__':
    info = SatLaunch("sqlite:///Data/UCS_Satellite.db")
    info.display_db_info()
    info.meta_info()

    # print("\nAll Satellite Names:\n", info.get_satellite_names())
    # print("\nSatellite 1HOPSAT-TD:\n", info.get_demographic_data("1HOPSAT-TD (1st-generation High Optical Performance Satellite)"))
    # print("\nAll Satellite-Owned Countries\n", info.get_40yr_sat_lauch_by_country())
    # print("\nAll Satellite-Owned Countries\n", info.get_40yr_sat_lauch_by_country("USA"))
    # print("\nEntire Database:\n", info.get_40yr_master_record())
    # print("\nAll Satellite-Owned Countries\n", info.get_launch_date())
    # print("\nTop 10 Launch Dates\n", info.get_top10_launch_dates())
    # print("\nGet Country Name by Year\n", info.get_countryCount_perYear_perCountry())





