using System.Net;
using System.Net.Sockets;
using System.Text.RegularExpressions;
using System.Text;
using WatsonWebsocket;

namespace wdfchess_Server;
internal class Program
{
    static void Main(string[] args)
    {
        int port = 9000;
        if (args.Length > 0)
            port = int.Parse(args[0]);
        WatsonWsServer server = new("localhost", port);
        server.ClientConnected += Game.ClientConnected;
        server.ClientDisconnected += Game.ClientDisconnected;
        server.MessageReceived += Game.MessageReceived;
        server.Start();
        Console.WriteLine("Server started. Press any key to stop");
        Console.ReadLine();
        server.Stop();
        Console.WriteLine("Server stopped");
    }
}