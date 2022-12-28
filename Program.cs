using System.Net;
using System.Net.Sockets;
using System.Text.RegularExpressions;
using System.Text;

namespace wdfchess_Server;
internal class Program
{
    static void Main(string[] args)
    {
        var server = new WebSocketServer("127.0.0.1", 80);
        server.getResponse = (str) =>
        {
            return str.Reverse().ToString();
        };
        server.Start();
    }
}