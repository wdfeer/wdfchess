using System;
using System.Collections.Generic;
using System.IO.Pipes;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatsonWebsocket;

namespace wdfchess_Server;
internal static class Network
{
    public static WatsonWsServer server;
    static List<ClientMetadata> clients = new List<ClientMetadata>();
    public static ClientMetadata? GetClient(Guid guid) => clients.Find(x => x.Guid == guid);
    public static void Initialize(WatsonWsServer server)
    {
        Network.server = server;
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
        void BroadcastMessage(string msg, Guid ignore)
        {
            foreach (ClientMetadata client in clients)
            {
                if (client.Guid != ignore)
                    server.SendAsync(client.Guid, msg);
            }
        }
        string message = Encoding.UTF8.GetString(args.Data);
        BroadcastMessage(message, args.Client.Guid);

        if (message[0] == 'r')
        {
            string name = String.Concat(message.Skip(2));

            var client = GetClient(args.Client.Guid);
            if (client == null) throw new ArgumentException("Client not found!");
            client.Name = name;
            Console.WriteLine("Set the client's name to " + name);
        }
    }
}
