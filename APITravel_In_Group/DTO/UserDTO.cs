﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
   public  class UserDTO
    {
        public string Identity { get; set; }
        public string Name { get; set; }
        public string Mail { get; set; }
        public Nullable< bool> Gender { get; set; }
    }
}
