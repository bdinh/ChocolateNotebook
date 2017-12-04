## data-wranging-maker-names.R
## Gets a list of all of the unique chocolate making companies for display in the chocolate journal

barsData <- read.csv(file = 'chocolate-bars.csv', fill=TRUE, header=TRUE, stringsAsFactors = FALSE)

uniqueProducerNames <- unique(barsData$Company)
for(name in uniqueProducerNames) {
  print(paste0("{ label: '", name, "', value: '", tolower(name), "' },"))
}

uniqueRegionNames <- unique(barsData$Broad.Bean.Origin)
for(region in uniqueRegionNames) {
  print(paste0("{ label: '", region, "', value: '", tolower(region), "' },"))
}