<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:tei="http://www.tei-c.org/ns/1.0"
    exclude-result-prefixes="xs tei"
    version="2.0">
    
    <!-- <xsl:output method="xml" omit-xml-declaration="yes" indent="yes" /> -->

    
    <xsl:template match="tei:TEI">
                     <div class="row">
                         <div class="col">
                             <h4>About the manuscript page:</h4>
                             <xsl:value-of select="//tei:sourceDesc"/>
                             <xsl:value-of select="//tei:licence"/> <!-- You can change the way the metadata is visualised as well-->
                         </div>
                         <div class="col">
                             <h4>Overview of changes by Mary and Percy Shelley:</h4>
                            <ul> 
                                <li>Total number of modifications: 
                                    <xsl:value-of select="count(//tei:del|//tei:add)" /> <!-- Counts all the add and del elements, and puts it in a list item -->
                                </li>
                                <li>Total number of additions: 
                                    <xsl:value-of select="count(//tei:add)" />
                                </li>
                                <li>Total number of deletions:
                                    <xsl:value-of select="count(//tei:del)" />
                                </li>
                                <li>Number of corrections by Percy Shelley:
                                    <xsl:value-of select="count(//tei:add[@hand='#PBS']|//tei:del[@hand='#PBS'])" />
                                </li>
                                <li>Number of corrections by Mary Shelley:
                                    <xsl:value-of select="count(//tei:add[@hand='#MWS']|//tei:del[@hand='#MWS'])" />  
                                </li>
                            </ul>
                        </div>
                     </div>
        <hr/>
    </xsl:template>
    

</xsl:stylesheet>
