<h1>Merci pour votre commande, {{ $commande->nom_destinataire }} !</h1>
<p>Nous avons bien reçu votre demande via notre formulaire.</p>
<p><strong>Numéro de commande :</strong> {{ substr($commande->id_commande, 0, 16) }}</p>
<p>Notre équipe Volta Network Services va revenir vers vous très rapidement pour finaliser la livraison.</p>
<br>
<p>À bientôt !</p>