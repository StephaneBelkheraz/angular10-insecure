# Application Angular Vulnérable - Documentation

## 🎯 Objectif

Cette application Angular 10.1.4 a été intentionnellement conçue avec de multiples vulnérabilités pour tester et valider l'efficacité des outils SAST (Static Application Security Testing) et SCA (Software Composition Analysis) tels que Snyk, Checkmarx et JFrog Xray.

## ⚠️ AVERTISSEMENT

**Cette application contient des vulnérabilités de sécurité intentionnelles. NE JAMAIS déployer en production ou sur un environnement accessible publiquement.**

## 📦 Dépendances Vulnérables

L'application utilise délibérément des versions obsolètes de bibliothèques contenant des CVE connues :

### Dépendances de Production

| Bibliothèque | Version | CVE/Vulnérabilités | Sévérité |
|--------------|---------|-------------------|----------|
| **lodash** | 4.17.11 | CVE-2019-10744 | High |
| | | Prototype Pollution permettant l'injection de propriétés malveillantes | |
| **jquery** | 3.3.1 | CVE-2019-11358, CVE-2020-11022, CVE-2020-11023 | Medium-High |
| | | XSS via $.extend(), vulnérabilités dans les sélecteurs HTML | |
| **handlebars** | 4.0.11 | CVE-2019-19919, CVE-2019-20920 | High |
| | | Prototype Pollution et Remote Code Execution | |
| **serialize-javascript** | 1.7.0 | CVE-2019-16769 | High |
| | | Injection de code via la sérialisation non sécurisée | |

### Framework Angular

- **Angular 10.1.4** : Version obsolète avec plusieurs vulnérabilités de sécurité corrigées dans les versions ultérieures
- **RxJS 6.6.0** : Version avec des vulnérabilités de déni de service potentielles
- **Zone.js 0.10.2** : Version obsolète avec des problèmes de performance et de sécurité

## 🔍 Vulnérabilités OWASP Top 10 Implémentées

### A01:2021 – Broken Access Control
- Pas de vérification des permissions dans le panel admin
- Accès direct aux fonctionnalités sensibles sans authentification

### A02:2021 – Cryptographic Failures
- Clés API hardcodées : `sk_live_1234567890abcdef`
- Mots de passe stockés en clair dans localStorage
- Tokens JWT faibles et prédictibles
- Utilisation de btoa() pour la "cryptographie"

### A03:2021 – Injection
- **SQL Injection** : Construction de requêtes non paramétrées
- **Command Injection** : Exécution de commandes OS avec entrées utilisateur
- **LDAP Injection** : Requêtes LDAP non sécurisées
- **XPath Injection** : Requêtes XPath avec entrées non validées
- **XSS** : Multiple points d'injection via innerHTML et eval()

### A04:2021 – Insecure Design
- **XXE (XML External Entity)** : Parsing XML non sécurisé
- **Path Traversal** : Validation insuffisante des noms de fichiers
- Pas de validation des types de fichiers uploadés

### A05:2021 – Security Misconfiguration
- Source maps exposés en production
- Mode debug activé avec logs sensibles
- Configuration Angular non optimisée

### A06:2021 – Vulnerable and Outdated Components
- Toutes les dépendances listées ci-dessus avec leurs CVE respectives

### A07:2021 – Identification and Authentication Failures
- Tokens de session prévisibles
- Mécanisme de réinitialisation de mot de passe non sécurisé
- Stockage multiple et non sécurisé des tokens

### A08:2021 – Software and Data Integrity Failures
- Désérialisation JSON non sécurisée avec eval()
- Pas de vérification d'intégrité des données

### A09:2021 – Security Logging and Monitoring Failures
- Aucun logging des événements de sécurité
- Exposition d'informations sensibles dans la console

### A10:2021 – Server-Side Request Forgery (SSRF)
- Endpoints d'API non validés permettant des requêtes arbitraires

## 🛠️ Installation et Utilisation

```bash
# Installation des dépendances
npm install

# Lancement de l'application
npm start

# Build de production (avec vulnérabilités)
npm run build
```

## 🔬 Tests avec les Outils SAST/SCA

### Snyk
```bash
# Installation de Snyk CLI
npm install -g snyk

# Test des vulnérabilités
snyk test

# Test avec génération de rapport
snyk test --json > snyk-report.json
```

### Explications des failles dans .npmrc 

1. **Token/API key exposé** : n’importe qui clone le repo → accès au registre, packages privés, etc.

2. **ID/MDP en clair** : mots de passe commités, souvent trouvés sur GitHub (fuites massives).

3. **SSL désactivé** : un attaquant sur le réseau peut injecter du code malveillant via MITM.

4. **Confusion de registry** : risque d’installer du code malveillant publié sous un scope d’entreprise.

5. **Proxy en clair** : facile à détourner, surtout dans les environnements partagés.

6. **ignore-scripts=false** : permet à tout package compromis d’exécuter du code arbitraire à l’installation.

7. **always-auth=false** : npm n’envoie pas toujours le token, donc certaines requêtes peuvent partir sans auth, possible exfiltration d’info.

8. **legacy-peer-deps=true** : on autorise l’installation de dépendances incompatibles/obsolètes, risque d’importer des libs vérolées.

9. **_auth en clair** : même effet que les tokens, avec encore moins de traçabilité.

10. **loglevel=silent** : aucune trace d’attaque ou de comportement suspect dans les logs npm.

## 📊 Résultats Attendus

Les outils SAST/SCA devraient détecter au minimum :

- **4+ vulnérabilités critiques** dans les dépendances
- **10+ vulnérabilités de code** (XSS, Injection, etc.)
- **5+ problèmes de configuration** de sécurité
- **3+ secrets/clés API** exposés

## 🎓 Utilisation Pédagogique

Cette application est idéale pour :

1. **Formation DevSecOps** : Comprendre les vulnérabilités courantes
2. **Validation d'outils** : Tester la configuration des scanners de sécurité
3. **Benchmarking** : Comparer l'efficacité de différents outils SAST/SCA
4. **Sensibilisation** : Montrer l'impact des dépendances obsolètes

## 📝 Notes Importantes

- Chaque vulnérabilité est commentée dans le code avec le préfixe `// VULNÉRABILITÉ:`
- Les CVE des dépendances sont réelles et documentées
- L'application couvre les 10 catégories du OWASP Top 10 2021

## 🚨 Rappel de Sécurité

**NE JAMAIS utiliser ce code en production. Il est uniquement destiné à des fins éducatives et de test dans des environnements isolés.**

remove node_modules folder
Remove-Item -Recurse -Force node_modules; Remove-Item -Force package-lock.json
