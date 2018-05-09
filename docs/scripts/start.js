// @ts-check
const Bundler = require('parcel-bundler');
const path = require('path');
const fse = require('fs-extra');

const docsDir = path.resolve(__dirname, '..');
const entryFile = path.resolve(docsDir, './index.html');
const contentFileDir = path.resolve(docsDir, 'content');
const rawFileDir = path.resolve(docsDir, 'raw');

const allFiles = fse.readdirSync(contentFileDir);

fse.removeSync(rawFileDir);

allFiles.forEach(file => {
  const source = path.resolve(contentFileDir, file);
  const name = path.basename(file, '.tsx');
  const dest = path.resolve(rawFileDir, name + '.raw');
  fse.ensureDirSync(path.dirname(dest));
  fse.symlinkSync(source, dest);
});

// Options du paquet
const options = {
  watch: true, // Surveiller les fichiers et les reconstruire lors d'un changement, par défaut pour process.env.NODE_ENV !== 'production'
  // outDir: './dist', // Le répertoire out pour mettre les fichiers de construction, par défaut dist
  // outFile: 'index.html', // Le nom du fichier de sortie
  // publicUrl: './', // L'URL du serveur, par défaut à dist
  cache: false, // Activé ou désactivé la mise en cache, la valeur par défaut est true
  // cacheDir: '.cache', // Le répertoire où le cache est placé, par défaut .cache
  // minify: false, // Minifie les fichiers, activé si process.env.NODE_ENV === 'production'
  // target: 'browser', // browser/node/electron, par défaut browser
  // https: false, // Les fichiers du serveur sur https ou http, par défaut à false
  // logLevel: 3, // 3 = Tout consigner, 2 = Consigner les erreurs et les avertissements, 1 = Consigner uniquement les erreurs
  // hmrPort: 0, // Le port sur lequel la socket hmr fonctionne, par défaut à un port libre aléatoire (0 dans node.js se traduit en un port libre aléatoire)
  // sourceMaps: true, // Active ou désactive sourcemaps, par défaut activé (pas encore pris en charge dans les versions minifiées)
  // hmrHostname: '', // Un nom d'hôte pour le rechargement de module à chaud, par défaut à ''
  // detailedReport: false, // Affiche un rapport détaillé des paquets, des ressources, des tailles des fichiers et des durées, par défaut à false, les rapports ne sont affichés que si le mode watch est désactivée
};

const bundler = new Bundler(entryFile, options);

bundler.addAssetType('raw', require.resolve('./AstAsset'));

bundler.serve(1234, false).then(server => {
  console.info(`http://localhost:1234/`);
});
