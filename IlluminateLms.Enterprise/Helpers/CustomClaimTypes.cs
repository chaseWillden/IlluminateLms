namespace IlluminateLms.Enterprise.Helpers
{
    public static class CustomClaimTypes
    {
        ///<summary>A claim that specifies the permission of an entity</summary>
        public const string Permission = "permission";

        ///<summary>A claim that specifies the full name of an entity</summary>
        public const string FullName = "fullname";

        ///<summary>A claim that specifies the email of an entity</summary>
        public const string Email = "email";

        /// <summary>
        /// A claim that specifies the name of an entity
        /// </summary>
        public const string Name = "name";

        ///<summary>A claim that specifies the configuration/customizations of an entity</summary>
        public const string Configuration = "configuration";

        /// <summary>
        /// A claim that specifies the role of an entity
        /// </summary>
        public const string Role = "role";

        /// <summary>
        /// First name
        /// </summary>
        public const string FirstName = "first_name";

        /// <summary>
        /// Last name
        /// </summary>
        public const string LastName = "last_name";
    }
}