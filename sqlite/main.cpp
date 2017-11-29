/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * File:   main.cpp
 * Author: Juan
 *
 * Created on 2 de marzo de 2017, 14:25
 */
#include <iostream>
//#include <QApplication>
#include <QtSql/QSqlDatabase>
#include <QtSql/QSqlQuery>
#include <QtSql/QSqlError>
#include <QTextStream>
#include <QDebug>
int main(int argc, char *argv[]) {
    // initialize resources, if needed
    // Q_INIT_RESOURCE(resfile);
    std::cout<<"Content-type: text/html\n\r\n\r"<<std::endl;
    //QApplication app(argc, argv);
    QSqlDatabase db = QSqlDatabase::addDatabase("QSQLITE", "main");
    db.setDatabaseName("http://frokz.com/sqlite/jugadores.sqlite3");
    if(db.open()) {
        QTextStream(stdout) << "ok" << endl;
    } else {
        QTextStream(stdout) << "no ok" << endl;
    }
    if(db.open()) {
            QTextStream(stdout) << "db opened!\n";
            QSqlQuery query(db);
            QTextStream(stdout) << "number of tables: " << db.tables().count() << "\n";
            QTextStream(stdout) << "executing query\n";
            query.exec("CREATE TABLE people (id INTEGER PRIMARY KEY, name VARCHAR, age INTEGER, alive BOOLEAN);");
            QTextStream(stdout) << "number of tables: " << db.tables().count() << "\n";
    }
    // create and show your widgets here

    //return app.exec();
}
