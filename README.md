# ftp-serve
FTP server framework for Node.js

# TODO
// Order does not imply priority, nor workable items
- Switch to typescript
- Domain Abstractions: ServerMessage, DataConnection, Connector, NetworkInterface, Port
- Determine Domain Boundary / Ownership for interface and port (Connector / DTP)
- Determine how to pass configuration down the chain FTPServer -> ClientSession -> DTP -> ???
- Determine Command lifecycle and relationship with configuration (i.e. how handle access rights, and how configure commands)
- Define model for implementing custom file systems (interface vs command provider)
- Determine Command Configuration
- Error handling (Introduce result abstraction ?)
- Dependency Injection
- Compliance Testing Client
- Investigate how to confirm successful replies and how to close data connections in compliance with relevant specifications
- FTP/TLS, FTP/SSH
- Documentation, pipelining support, telnet non-compliance etc.
# References
- http://cr.yp.to/ftp.html
- https://stackoverflow.com/questions/42025253/does-ftp-support-utf-character-set