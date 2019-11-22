using System.Security.Cryptography;
using System.Text;

namespace Fablab.Data.Utils
{
    public static class MD5Utils
    {
        public static string HashMD5(this string input)
        {
            var md5Hash = MD5.Create();
            // Converter a String para array de bytes, que é como a biblioteca trabalha.
            var data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));

            // Cria-se um StringBuilder para recompôr a string.
            var sBuilder = new StringBuilder();

            // Loop para formatar cada byte como uma String em hexadecimal
            for (var i = 0; i < data.Length; i++) sBuilder.Append(data[i].ToString("x2"));

            return sBuilder.ToString();
        }
    }
}