﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class Travel_In_GroupDBEntities : DbContext
    {
        public Travel_In_GroupDBEntities()
            : base("name=Travel_In_GroupDBEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Driver> Drivers { get; set; }
        public virtual DbSet<Payment> Payments { get; set; }
        public virtual DbSet<Passenger> Passengers { get; set; }
        public virtual DbSet<PaymentKind> PaymentKinds { get; set; }
        public virtual DbSet<TravelDriverRange> TravelDriverRanges { get; set; }
        public virtual DbSet<TravelingPassenger> TravelingPassengers { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<TravelPassengerRange> TravelPassengerRanges { get; set; }
        public virtual DbSet<TravelReporting> TravelReportings { get; set; }
        public virtual DbSet<TravelingDriver> TravelingDrivers { get; set; }
        public virtual DbSet<Registeration> Registerations { get; set; }
        public virtual DbSet<RegistrationDateRange> RegistrationDateRanges { get; set; }
    }
}
