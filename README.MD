## React Dependencies Graph
Map out your react dependencies

## Quickstart
- Clone the repo `https://github.com/joerodrig3/react-dependencies-to-json.git`
- `cd react-dependencies-to-json`
- `npm install`
- `npm link`
- `parse-react-dependencies ~/base/path/to/your/components`

## How does it work?
Input the path to the folder which contains your `components` and `containers`
folders.
```
app/
  javascripts/
    components/
    containers/
```

For example, the command you would input to parse the structure above would be `parse-react-dependencies ~/path/to/app/javascripts`

The script will recursively scan through each of your files in the **components** and
**containers** folders and extract component information from your import statements

## Ignore modules
To ignore import statements in modules, enter the import name in `ignored.js`
