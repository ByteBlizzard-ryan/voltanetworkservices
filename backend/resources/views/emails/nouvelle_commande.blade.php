<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; }
        .header { background-color: #1A4301; color: #9ADE7B; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .section { padding: 20px; }
        .footer { font-size: 12px; text-align: center; color: #888; margin-top: 20px; }
        table { w-full; border-collapse: collapse; margin-top: 20px; }
        th { text-align: left; border-bottom: 2px solid #9ADE7B; padding: 10px; font-size: 12px; text-transform: uppercase; }
        td { padding: 10px; border-bottom: 1px solid #eee; }
        .total-row { background-color: #f9f9f9; font-weight: bold; }
        .badge { background-color: #9ADE7B; color: #1A4301; padding: 5px 10px; border-radius: 4px; font-weight: bold; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>VOLTA NETWORK SERVICES</h1>
            <p>Nouvelle Alerte Commande</p>
        </div>

        <div class="section">
            <p>Bonjour,</p>
            <p>Une nouvelle commande vient d'être passée via le <strong>formulaire web</strong>.</p>
            
            <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
                <h3 style="margin-top: 0; color: #1A4301;">Infos Destinataire</h3>
                <p><strong>Nom :</strong> {{ $commande->nom_destinataire }}<br>
                <strong>Téléphone :</strong> {{ $commande->telephone_contact }}<br>
                <strong>Email :</strong> {{ $commande->email_contact ?? 'Non renseigné' }}<br>
                <strong>Adresse :</strong> {{ $commande->adresse_livraison ?? 'À définir' }}</p>
            </div>

            <h3 style="color: #1A4301;">Détails du Panier</h3>
            <table width="100%">
                <thead>
                    <tr>
                        <th>Produit</th>
                        <th style="text-align: center;">Qté</th>
                        <th style="text-align: right;">Prix Scellé</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($commande->details as $detail)
                    <tr>
                        <td>
                            <strong>{{ $detail->produit->nom_produit ?? 'Produit inconnu' }}</strong><br>
                            <small style="color: #666;">ID: {{ substr($detail->id_produit_fk, 0, 8) }}</small>
                        </td>
                        <td style="text-align: center;">x{{ $detail->quantite_commandee }}</td>
                        <td style="text-align: right;">{{ number_format($detail->prix_global_scelle, 0, ',', ' ') }} FCFA</td>
                    </tr>
                    @endforeach
                    <tr class="total-row">
                        <td colspan="2" style="text-align: right; padding: 15px;">TOTAL COMMANDE :</td>
                        <td style="text-align: right; padding: 15px; color: #1A4301; font-size: 18px;">
                            {{ number_format($commande->details->sum('prix_global_scelle'), 0, ',', ' ') }} FCFA
                        </td>
                    </tr>
                </tbody>
            </table>

            <p style="margin-top: 30px;">
                <span class="badge">STATUT : EN COURS</span>
                <span class="badge" style="background-color: #eee; color: #333; margin-left: 10px;">CANAL : {{ $commande->canal_commande }}</span>
            </p>
        </div>

        <div class="footer">
            <p>Ceci est un message automatique généré par votre plateforme Volta Network Services.<br>
            &copy; {{ date('Y') }} Volta Network Services. Tous droits réservés.</p>
        </div>
    </div>
</body>
</html>