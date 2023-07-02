# MISC

- ## subnet pubblica
- subnet privata

  - All'interno di una rete, una subnet consente di suddividere l'indirizzo IP di rete in sottogruppi più piccoli, ognuno dei quali può essere gestito separatamente.
  - Questa suddivisione offre diversi vantaggi in termini di gestione, sicurezza e routing delle reti.
  - Identificazione: Una subnet viene identificata da un indirizzo di rete (IP di rete) e una maschera di sottorete (subnet mask). La maschera di sottorete determina quali bit dell'indirizzo IP vengono utilizzati per identificare la rete e quali bit sono riservati per gli indirizzi host all'interno della subnet.
  - Segmentazione della rete: Utilizzando le subnet, è possibile segmentare una rete più grande in sottoreti più piccole. Questo può essere utile per organizzare le risorse di rete in gruppi logici, consentendo una migliore gestione e controllo.
  - Gestione del traffico: Le subnet consentono di separare il traffico di rete in base alle diverse esigenze o reparti dell'organizzazione. Ad esempio, è possibile avere una subnet dedicata per i server, una per i dispositivi di rete e una per le postazioni di lavoro degli utenti. Ciò consente di applicare politiche di sicurezza e gestione specifiche a ciascuna subnet.
  - Routing: Le subnet sono utilizzate per indirizzare correttamente il traffico di rete all'interno di una rete più grande. I router utilizzano le informazioni di routing basate sulle subnet per instradare i pacchetti di rete al destinatario corretto.
  - Sicurezza: L'utilizzo di subnet separate può contribuire a migliorare la sicurezza della rete. Ad esempio, è possibile applicare regole di sicurezza specifiche alle subnet, come i firewall o i sistemi di rilevamento delle intrusioni (IDS), per controllare e monitorare il traffico all'interno di ciascuna sottorete.

- NAT
  - mappa un blocco di indirizzi di una rete privata in un unico indirizzo ip pubblico esposto a internet.
    fa quindi routing da e verso internet al dispositivo interno alla rete

# AWS

- region:
  - località geografica
- availability zone:
  - si trovano all'interno di una region
  - posso deployare il mio k8s su più AZ, in modo da avere resilenza, scalabilità e load balancing e diminuire la latenza
- nodo worker:
  - instanza ec2 dove gira k8s
  - all'interno dell'istanza ho l'architettura ingress, service, deployment
  - ogni service (frontend/backend/postgres) stabilisce quanti pod sono su
  - dovrebbe esserci anche il load balancer
- cluster eks:
  - insieme di nodi worker
- virtual private cloud:
  - consente di creare una rete virtuale isolata e personalizzabile all'interno dell'infrastruttura cloud di AWS
  - crea un isolamento che permette di controllare l'accesso alle risorse e di definire regole di sicurezza per protezione
  - puoi definire range ip, subnet, route, tabella di routing, regole di sicurezza
  - Gateway Internet e Gateway NAT: Un VPC include un gateway Internet che consente alle risorse all'interno del VPC di comunicare con Internet. Inoltre, puoi configurare un Gateway NAT per consentire alle risorse all'interno del VPC di accedere a Internet senza esporre direttamente gli indirizzi IP delle risorse.
  - Integrazione con altri servizi AWS: Un VPC può essere collegato ad altri servizi AWS come Amazon S3 (Simple Storage Service), AWS Lambda, AWS RDS (Relational Database Service) e altri. Ciò ti consente di integrare facilmente i tuoi servizi nel tuo ambiente VPC e di sfruttare le funzionalità avanzate offerte da AWS.
- Bastion Host:
  - Un Bastion Host, noto anche come "Jump Host" o "Jump Box", è una macchina virtuale o un'istanza EC2 configurata come punto di accesso sicuro per raggiungere altre istanze all'interno di una rete privata o di un VPC. Il Bastion Host agisce come un punto di ingresso per gli amministratori o gli operatori di sistema per accedere in modo sicuro alle risorse all'interno di un ambiente privato. Fornisce un'interfaccia sicura per la gestione e la manutenzione delle risorse all'interno della rete.

# DOCKER

docker compose build
docker compose up
docker system prune -a
docker ps -a

# KUBERNETES

#kuberntes secrets
https://kubernetes.io/docs/reference/kubectl/cheatsheet/
kubectl get pods
kubectl get services
kubectl get pv
kubectl apply -f k8s
// create resource(s) in all manifest files in dir
kubectl delete -f k8s
kubectl get secret
kubectl describe pods
kubectl describe pods/nginx
kubectl config get-contexts
kubectl create secret generic pgpassword --from-literal PGPASSWORD=12345test

kubectl config view
// recupera la configurazione corrente utilizzata per interagire con i cluster Kubernetes

kubectl config current-context
// recupera il contesto corrente che specifica quale cluster, utente e namespace vengono utilizzati per le operazioni di kubectl.
// È importante notare che il contesto corrente influisce sulle operazioni di kubectl. Ad esempio, quando si eseguono comandi come kubectl get pods o kubectl apply, kubectl utilizzerà il contesto corrente per determinare a quale cluster inviare le richieste e quale utente utilizzare per l'autenticazione.

# TERRAFORM

kubectl create secret docker-registry regcred --docker-server=https://index.docker.io/v1/ --docker-username=fabioman93 --docker-password=tibiaomero@0801 --docker-email=fabio_mangano@hotmail.it
kubectl create secret generic pgpassword --from-literal PGPASSWORD=12345test
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/aws/deploy.yaml

kubectl config set-context <context name>
