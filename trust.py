import os
g = open("trust.sh","w")
g.write("#!/bin/bash\n")
fichier=[]

for root, dirs, files in os.walk(os.getcwd()): 
    for i in files: 
        f = os.path.join(root, i)
        if f[-6:] == ".ipynb":
            g.write("jupyter trust {}\n".format(f))
  
g.close()
