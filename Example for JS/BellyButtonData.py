# dependencies
import pandas as pd
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect, join, outerjoin, MetaData, Table

class BellyButtonDatas():

    def __init__(self, connect_string):
        self.engine = create_engine(connect_string)
        # self.conn = self.engine.connect()
        self.connect_string = connect_string
        self.inspector = inspect(self.engine)
        self.tables = self.inspector.get_table_names()
        self.Base = automap_base()
        self.Base.prepare(self.engine, reflect=True)
        self.Subjects = self.Base.classes['subjects']
        self.meta = MetaData()
        self.TestResults = Table('test_results_view', self.meta, 
                    autoload_with=self.engine)
        self.OTURef = self.Base.classes['otu_reference']


    def display_db_info2(self):
        _inspector = inspect(self.engine)
        _tables = self._inspector.get_table_names()
        for table in self._tables:
            print("\n")
            print('=' * 12)
            print(f"Table '{table}' has the following columns: ")
            print('-' * 12)
            for column in self._inspector.get_columns(_table):
                print(f"name: {column['name']}   column type: {column['type']}")

    def display_db_info(self):
        inspector = inspect(self.engine)
        tables = self.inspector.get_table_names()
        for table in self.tables:
            print("\n")
            print('-' * 12)
            print(f"table '{table}' has the following columns:")
            print('-' * 12)
            for column in self.inspector.get_columns(table):
                print(f"name: {column['name']}   column type: {column['type']}")

    # @app.route("/api/v1.0/ids")
    def get_subject_ids(self):
        session = Session(self.engine)

        results = session.query(self.Subjects.id)
            
        df = pd.read_sql(results.statement, session.connection())

        session.close()  
        return list(df.id)  

    # @app.route("/api/v1.0/otu")
    def get_otu_ref(self):
        session = Session(self.engine)

        results = session.query(self.OTURef)
            
        df = pd.read_sql(results.statement, session.connection())

        session.close()  
        return df.to_dict(orient="records") 

    # @app.route("/api/v1.0/subjects")
    def get_subjects(self, subj_id=0):
        session = Session(self.engine)

        if subj_id == 0:
            results = session.query(self.Subjects)
        else:
            results = session.query(self.Subjects).filter(self.Subjects.id == subj_id)    
            
        df = pd.read_sql(results.statement, session.connection())

        session.close()  
        return df.to_dict(orient="records")     

    # to be used with get_data_by_user
    def get_test_results(self, subj_id=0): 
        session = Session(self.engine)

        if subj_id == 0:
            results = session.query(self.TestResults)
        else:
            results = session.query(self.TestResults).filter_by(subject_id = subj_id)    
            
        df = pd.read_sql(results.statement, session.connection())

        session.close()  
        return df.to_dict(orient="records")    

    # @app.route("/api/v1.0/info")
    def get_data_by_user(self, subj_id=940):
        return {
            'user': self.get_subjects(subj_id)[0],
            'results': self.get_test_results(subj_id)
        }               


if __name__ == '__main__':
    info = BellyButtonDatas("sqlite:///Data/belly_button.sqlite")
    info.display_db_info()
    print("\nSubject IDs\n", info.get_subject_ids())
    print("\nsubject 1286:\n", info.get_subjects(1286))
    print("\nResults 1286:\n", info.get_test_results(1286))
    print("\nData for user 1286:\n", info.get_data_by_user(1286))



        