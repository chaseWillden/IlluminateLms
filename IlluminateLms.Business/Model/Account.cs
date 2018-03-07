namespace IlluminateLms.Business.Model
{
    public class Account
    {
        /// <summary>
        /// Account Id
        /// </summary>
        public long? AccountId { get; set; }
        
        /// <summary>
        /// Account name
        /// </summary>
        public string Name { get; set; }
        
        /// <summary>
        /// Is archived
        /// </summary>
        public bool IsArchived { get; set; }
        
        /// <summary>
        /// Is root
        /// </summary>
        public bool IsRoot { get; set; }
        
        /// <summary>
        /// Default timezone
        /// </summary>
        public string DefaultTimeZone { get; set; }
        
        /// <summary>
        /// Parent Account
        /// </summary>
        public Account ParentAccount { get; set; }
    }
}