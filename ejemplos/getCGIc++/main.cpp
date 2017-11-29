
#include <stdio.h>
#include <iostream>
#include <string>
#include <map>
#include "getpost.h"
#include <cstdlib>
#include <fstream>
#include <string>
#include <cstdlib>

using namespace std;

/*
 * 
 */
int main() {
    map<string,string> Get;
	initializeGet(Get); //notice that the variable is passed by reference!
	cout<<"Content-type: text/html\n\r\n\r"<<endl<<endl;
	
        //cout<<"El operando 1 es "<<Get["operando1"]<<", El operando 2 es "<<Get["operando2"];
        
        ofstream miarchivo;
        miarchivo.open("../htdocs/posiciones/posiciones.txt");
        miarchivo <<""<<Get["p1x"]<<","<<Get["p1y"]<<","<<Get["p2x"]<<","<<Get["p2y"];
        miarchivo.close();
    return 0;
}

