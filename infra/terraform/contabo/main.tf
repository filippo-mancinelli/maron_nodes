terraform { 
  cloud { 
    
    organization = "maronnodes" 

    workspaces { 
      name = "ContaboRuns" 
    } 
  } 
}