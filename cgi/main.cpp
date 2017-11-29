#include <cstdlib>
#include <string>
#include <vector>
#include <string.h>
#include <stdio.h>
#include <iostream>
#include <fstream>

using namespace std;

int main(int argc, char** argv) {
    cout<<"Content-type: text/html\n\r\n\r"<<endl<<endl;
    
    /*/////////////////LEO DE UN ARCHIVO////////////////////*/
    string linea;
    ifstream miarchivo("player2.txt");
    //ifstream miarchivo("posiciones.txt");
    
    if(miarchivo.is_open()){
        while(getline(miarchivo,linea)){
            cout << linea << '\n';
        }
        miarchivo.close();
    }
    
    return 0;
}

