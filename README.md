# Docker

Per eseguire l'applicazione in locale tramite docker-compose:

1. Installare docker dalla pagina: https://docs.docker.com/desktop/install/windows-install/, creare un account e avviare Docker Desktop
2. Spostarsi nella root di progetto e avviare il progetto tramite il comando: "docker compose up"
3. Aprire una finestra del browser all'url: http://localhost:3050/
4. Aprire l'inspect del browser (f12 o tasto dx mouse) e nella sezione Network applicare un delay di rete (slow 3G) (chrome)
5. Eseguire le operazioni desiderate nell'applicazione per testarne il funzionamento
6. Posizionarsi nella root di progetto e terminare l'esecuzione del progetto tramite il comando: "docker compose down"

# Kubernetes

Per eseguire l'applicazione in locale tramite kubernetes:

1. Eseguire (1) della sezione docker, se non precedentemente fatto
2. Accertarsi, nell'app Docker Desktop, che kubernetes sia abilitato controllando che in "settings\kubernetes", l'opzione "enable kubernetes" sia flaggata.
3. Accertarsi inoltre, controllando in basso a sx all'interno della finestra dell'app, che sia kubernetes che docker siano up & running (le due icone sono entrambe verdi)
4. Creare un account su Docker Hub https://hub.docker.com/, e una volta registrati, è necessario cambiare piano per poter avere più di un repo privato
5. In repositories, creare il primo repo per il client inserendo i campi richiesti (namespace e name) e flaggando l'opzione private
6. Creare quindi nello stesso modo un repo per il server
7. NB: nell'esempio fornito sono stati creati due repo con namespace=fabioman93 (nome utente docker) e repositryName=server/client, in modo da essere recuperati come fabioman93/server:tag o fabioman93/client:tag. I nomi saranno differenti soltanto per la prima parte.
8. Dal root di progetto (dopo aver eseguito "docker login"), spostarsi nella cartella "client" ed eseguire i comandi:
   a) docker build -t <your-domain>/client:v2 .
   b) docker push <your-domain>/client:v2 .
9. Spostarsi quind nella cartalla "server" ed eseguire i comandi:
   a) docker build -t <your-domain>/server:v2 .
   b) docker push <your-domain>/server:v2 .
10. Creare quindi due secret tramite i seguenti comandi:
    a. kubectl create secret generic pgpassword --from-literal PGPASSWORD=12345test
    b. kubectl create secret docker-registry regcred --docker-server=https://index.docker.io/v1/ --docker-username=<username> --docker-password=<password> --docker-email=<email>
11. Applicare l'ingress-nginx tramite il comando: kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/aws/deploy.yaml
12. Posizionarsi nella root del progetto e creare quindi l'infrastruttura tramite il comando: "kubectl apply -f k8s"
13. Dopo un po di tempo, navigando dal browser su localhost (porta default 80), si avrà l'applicazione up & running

# AWS EKS

Per eseguire l'applicazione in aws eks:

1. Eseguire (1) della sezione docker, (8) e (9) della sezione kubernetes se non precedentemente fatto
2. Installare Terraform navigando alla pagina https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli
3. Registrare un account su aws https://portal.aws.amazon.com/billing/signup?nc2=h_ct&src=default&redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation#/account
4. Installare la cli aws https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html e configurarla https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
5. Installare Aws IAM Authenticator https://docs.aws.amazon.com/eks/latest/userguide/install-aws-iam-authenticator.html
6. Kubectl dovrebbe essere già installato tramite docker
7. Eseguire il comando "cd ./terraform"
8. Eseguire quindi il comando "terraform apply" e digitare "yes" quando richiesto. L'operazione di creazione dell'infrastruttura durerà divero tempo (da 10 min fino a 30min)
9. Eseguire il comando:
   aws eks --region $(terraform output -raw region) update-kubeconfig \
    --name $(terraform output -raw cluster_name) // aggiorna il context
10. Posizionarsi sulla root di progetto tramite il comando "cd .."
11. Eseguire i passi (10), (11) e (12) della sezione precedente
12. Eseguire il comando "kubectl get ingress" e recuperare l'address dell'ingress
13. Digitare l'url copiato nel browser e, dopo un po di tempo, sarà visibile l'app
14. Posizionarsi nella cartella terraform e digitare "terraform destroy"
