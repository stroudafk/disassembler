#include <iostream>
#include <fstream>
#include <string>
using namespace std;

 int main(int argc, char const *argv[]) {
     string filename;
     if (argc > 1) {
        filename = argv[1];
     } else {
        cout << "Please enter filename (example text.txt): ";
        cin >> filename;
     }
     ifstream input(filename, ifstream::binary);
     ofstream output("output.txt");
     while (!input.eof() && input.good()) {
        for(int i = 0 ; i < 32; i ++){
           if(input.eof() || !input.good()){
              break;
           }
            char x;
            input >> x;
            int bit = x & 1;
            output << bit;
        }
        output << endl;
     }
     input.close();
     output.close();
     return 0;
 }
 
