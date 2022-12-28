using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatsonWebsocket;

namespace wdfchess_Server;
internal class Game
{
    public static void ClientConnected(object? sender, ConnectionEventArgs args)
    {
        Console.WriteLine("Client connected: " + args.Client.ToString());
    }

    public static void ClientDisconnected(object? sender, DisconnectionEventArgs args)
    {
        Console.WriteLine("Client disconnected: " + args.Client.ToString());
    }

    public static void MessageReceived(object? sender, MessageReceivedEventArgs args)
    {
        Console.WriteLine("Message received from " + args.Client.ToString() + ": " + Encoding.UTF8.GetString(args.Data));
        Program.server.SendAsync(args.Client.Guid, "no u");
    }
}
