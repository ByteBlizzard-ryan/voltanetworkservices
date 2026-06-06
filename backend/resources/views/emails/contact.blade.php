<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8fafc;
            color: #0f172a;
            margin: 0;
            padding: 40px 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
            border: 1px solid #e2e8f0;
        }
        .header {
            background-color: #0f172a;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 20px;
            letter-spacing: 2px;
            text-transform: uppercase;
        }
        .accent-bar {
            height: 4px;
            background-color: #9ADE7B;
            width: 100%;
        }
        .content {
            padding: 40px 30px;
        }
        .intro {
            font-size: 16px;
            color: #64748b;
            margin-bottom: 30px;
            line-height: 1.6;
        }
        .info-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        .info-table td {
            padding: 12px 0;
            border-bottom: 1px solid #f1f5f9;
            font-size: 14px;
        }
        .info-table td.label {
            color: #94a3b8;
            font-weight: bold;
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 1px;
            width: 30%;
        }
        .info-table td.value {
            color: #0f172a;
            font-weight: 600;
        }
        .message-box {
            background-color: #f8fafc;
            border-left: 4px solid #9ADE7B;
            padding: 20px;
            border-radius: 0 8px 8px 0;
            margin-top: 10px;
        }
        .message-title {
            font-size: 11px;
            font-weight: bold;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 8px;
        }
        .message-text {
            font-size: 14px;
            line-height: 1.6;
            color: #334155;
            white-space: pre-line;
        }
        .footer {
            background-color: #f8fafc;
            padding: 20px;
            text-align: center;
            font-size: 11px;
            color: #94a3b8;
            border-top: 1px solid #f1f5f9;
        }
    </style>
</head>
<body>

    <div class="container">
        <div class="header">
            <h1>Volta Network</h1>
        </div>
        <div class="accent-bar"></div>

        <div class="content">
            <p class="intro">Un utilisateur a soumis une nouvelle demande depuis le formulaire de contact de votre infrastructure.</p>
            
            <table class="info-table">
                <tr>
                    <td class="label">Expéditeur</td>
                    <td class="value">{{ $data['from_name'] }}</td>
                </tr>
                <tr>
                    <td class="label">Email</td>
                    <td class="value"><a href="mailto:{{ $data['reply_to'] }}" style="color: #0f172a; text-decoration: none; border-bottom: 1px dashed #9ADE7B;">{{ $data['reply_to'] }}</a></td>
                </tr>
                <tr>
                    <td class="label">Téléphone</td>
                    <td class="value">{{ $data['phone'] ?? 'Non renseigné' }}</td>
                </tr>
            </table>

            <div class="message-box">
                <div class="message-title">Message</div>
                <div class="message-text">{{ $data['message'] }}</div>
            </div>
        </div>

        <div class="footer">
            Sentinel System v2.0 — Généré automatiquement par l'application Volta Network.
        </div>
    </div>

</body>
</html>