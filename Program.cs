using System.Net;
using System.Net.Sockets;
using System.Text.RegularExpressions;
using System.Text;
using WatsonWebsocket;

namespace wdfchess_Server;
internal class Program
{
    public static void Main(string[] args)
    {
        string hostname = "localhost";
        if (args.Length >= 1)
            hostname = args[0];
        int port = 9000;
        if (args.Length >= 2)
            port = int.Parse(args[1]);
        Console.WriteLine($"Starting server with hostname: {hostname}, port: {port}");
        WatsonWsServer server = new(hostname, port);
        Network.Initialize(server);
        server.Start();
        Console.WriteLine("Server started. Type \"stop\" to stop");
        while (Console.ReadLine() != "stop") {}
        server.Stop();
        Console.WriteLine("Server stopped");
    }
}