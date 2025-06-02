-- Script AppleScript pour lancer le serveur PWA iPad
-- Peut être sauvé comme application (.app) dans Script Editor

on run
	try
		-- Obtenir le chemin du projet
		set projectPath to (path to me as string)
		set projectPath to POSIX path of (container of (path to me))
		
		-- Afficher une notification de démarrage
		display notification "Démarrage du serveur PWA iPad..." with title "PWA iPad Server" sound name "Glass"
		
		-- Obtenir l'adresse IP locale
		set ipAddress to do shell script "ifconfig | grep -E \"inet (192\\.168\\.|10\\.)\" | grep -v 127.0.0.1 | awk '{print $2}' | head -1"
		
		-- Préparer le message avec l'adresse IP
		if ipAddress is not "" then
			set serverURL to "http://" & ipAddress & ":8000"
			set ipMessage to "📱 Adresse pour iPad: " & serverURL
		else
			set serverURL to "http://localhost:8000"
			set ipMessage to "⚠️ Utiliser: http://localhost:8000"
		end if
		
		-- Afficher une boîte de dialogue avec les informations
		set dialogResult to display dialog "🚀 Serveur PWA iPad" & return & return & ipMessage & return & return & "Le serveur va démarrer dans Terminal." & return & "Gardez Terminal ouvert pour maintenir le serveur actif." buttons {"Annuler", "Lancer le serveur"} default button "Lancer le serveur" with icon note
		
		if button returned of dialogResult is "Lancer le serveur" then
			-- Lancer Terminal avec le script de serveur
			tell application "Terminal"
				activate
				do script "cd '" & projectPath & "' && ./launch-server.sh"
			end tell
			
			-- Attendre un peu puis afficher l'URL
			delay 2
			
			-- Offrir de copier l'URL dans le presse-papiers
			if ipAddress is not "" then
				set copyResult to display dialog "✅ Serveur démarré !" & return & return & "Adresse pour iPad:" & return & serverURL & return & return & "Voulez-vous copier l'adresse dans le presse-papiers ?" buttons {"Non", "Copier l'adresse"} default button "Copier l'adresse" with icon note
				
				if button returned of copyResult is "Copier l'adresse" then
					set the clipboard to serverURL
					display notification "Adresse copiée dans le presse-papiers" with title "PWA iPad Server" sound name "Purr"
				end if
			end if
		end if
		
	on error errorMessage
		display dialog "❌ Erreur lors du lancement:" & return & errorMessage buttons {"OK"} with icon stop
	end try
end run 