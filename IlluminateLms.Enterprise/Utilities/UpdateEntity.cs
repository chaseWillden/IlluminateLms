using System;
using System.Reflection;

namespace IlluminateLms.Enterprise.Utilities
{
    public class UpdateEntity
    {
        /// <summary>
        /// Compare and update object 1
        /// </summary>
        /// <param name="obj1"></param>
        /// <param name="obj2"></param>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public static T Merge<T>(T obj1, T obj2)
        {
            var propertyInfos = obj1.GetType().GetProperties();
            
            // sort properties by name
            Array.Sort(propertyInfos,
                (propertyInfo1, propertyInfo2) =>
                    string.Compare(propertyInfo1.Name, propertyInfo2.Name, StringComparison.Ordinal));

            // write property names
            foreach (var info in propertyInfos)
            {
                var val1 = info.GetValue(obj1);
                var val2 = info.GetValue(obj2);

                if (val2 == null || val1 == val2) continue;
                
                info.SetValue(obj1, val2);
            }

            return obj1;
        }
    }
}