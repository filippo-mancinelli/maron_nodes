terraform { 
  cloud { 
    
    organization = "maronnodes" 

    workspaces { 
      name = "AkamaiRuns" 
    } 
  } 
}