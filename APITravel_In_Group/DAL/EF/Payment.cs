//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DAL.EF
{
    using System;
    using System.Collections.Generic;
    
    public partial class Payment
    {
        public int Id { get; set; }
        public int IdRegisteration { get; set; }
        public int IdPaymentKind { get; set; }
        public System.DateTime PaymentDate { get; set; }
        public double SumPay { get; set; }
    
        public virtual PaymentKind PaymentKind { get; set; }
        public virtual Registeration Registeration { get; set; }
    }
}