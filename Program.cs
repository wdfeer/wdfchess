using System.Net;
using System.Net.Sockets;
using System.Text.RegularExpressions;
using System.Text;
using WatsonWebsocket;

namespace wdfchess_Server;
internal class Program
{
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
    public static WatsonWsServer server;
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
    public static void Main(string[] args)
    {
        int port = 9000;
        if (args.Length > 0)
            port = int.Parse(args[0]);
        server = new WatsonWsServer("localhost", port);
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