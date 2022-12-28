using System;
using System.Collections.Generic;
using System.IO.Pipes;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatsonWebsocket;

namespace wdfchess_Server;
internal static class Game
{
    static List<ClientMetadata> clients = new List<ClientMetadata>();
    public static void Initialize(WatsonWsServer server)
    {
        server.ClientConnected += ClientConnected;
        server.ClientDisconnected += ClientDisconnected;
        server.MessageReceived += MessageReceived;
    }
    public static void ClientConnected(object? sender, ConnectionEventArgs args)
    {
        Console.WriteLine("Client connected: " + args.Client.ToString());
        clients.Add(args.Client);
    }

    public static void ClientDisconnected(object? sender, DisconnectionEventArgs args)
    {
        Console.WriteLine("Client disconnected: " + args.Client.ToString());
        var client = clients.Find(x => x.Guid == args.Client.Guid);
        if (client != null)
            clients.Remove(client);
    }

    public static void MessageReceived(object? sender, MessageReceivedEventArgs args)
    {
        string text = Encoding.UTF8.GetString(args.Data);
        Console.WriteLine("Broadcasting message from " + args.Client.ToString() + ": " + text);
        clients.Where(x => x.Guid != args.Client.Guid).ToList()
            .ForEach(client => Program.server.SendAsync(client.Guid, text));
    }
}
