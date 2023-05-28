When a client connects the remote address is tested if it's part of a network the server listens to (LAN/Hamachi) or Internet,
when a client is from the internet, the address of the server is its public ip

When configuring a data connection, in the case of passive listen, the server should note which network interface the client is connecting from and listen only on that interface with the purpose of minimizing security concerns

# Mapping of client ip to host ip required for PASV response
1: (localhost:127.0.0.1) -> (localhost:127.0.0.1)
2: (local-client-ip:10.0.0.3) -> (local-host-ip:10.0.0.4)
3: (public-client-ip) -> (public-host-ip)

# Case of multiple public ips depending on network interfaces
In the case of 2 public ips on which the server listens, there should be a way to provide a mapping of private ip to public ip
1: (public-client-ip-1) -> (local-ip-1) -> (public-host-ip-1)
2: (public-client-ip-2) -> (local-ip-2) -> (public-host-ip-2)

# Model proposal
NetworkHost: (address:IP), (mask:NetMask), ...
IntranetHost / InternetHost

# IPv4/IPv6 considerations
Considerations should be taken in regards to ipv4 to ipv6 mapping