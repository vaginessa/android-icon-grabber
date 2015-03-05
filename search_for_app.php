<?php
    //CONSTS
    $search_url = 'https://play.google.com/store/search?q=';
    $app_url = 'https://play.google.com/store/apps/details?id=';
    $pkg_tag = "data-docid=";
    $img_tag = "cover-image";
    $icons_path =  getcwd() . "/images/";
    $icons_ext = ".png";
    $src_length = strlen(" src=\"");
    $pkg_tag_length = strlen($pkg_tag);
    $img_tag_length = strlen($img_tag);
  
  //do isset check before(?)
    $query = $_GET['query'];
    //validate the entry, etc
    
    $rawHtml = file_get_contents($search_url . urlencode($query));

    //Just pretend this doesnt exist...
    //TODO make this better with scraping or something
    $pkgPos = strpos ( $rawHtml , $pkg_tag);
    $halfHtml = substr($rawHtml, $pkgPos + $pkg_tag_length);
    $pkgPosEnd = strpos( $halfHtml, "data");
    //Magic numbers inbound
    $packageName = substr($rawHtml, $pkgPos + $pkg_tag_length + 1, $pkgPosEnd -3);
    $filePath = '/images/' . $packageName . $icons_ext;
    
    //See if we already have the file
    if (file_exists($icons_path . $packageName . $icons_ext)) {
        echo $filePath;
        exit;
    }
    
    $rawDetailHtml = file_get_contents($app_url . $packageName);
    
    $imgPos = strpos ( $rawDetailHtml , $img_tag);
    $halfHtml = substr($rawDetailHtml, $imgPos + $img_tag_length);
    $imgPosEnd = strpos( $halfHtml, "alt");
    $imageUrl = substr($rawDetailHtml, $imgPos + $img_tag_length + $src_length + 1, $imgPosEnd - 9);
    $img = $icons_path . $packageName .$icons_ext;
    file_put_contents($img, file_get_contents($imageUrl));
    echo $filePath;
?>